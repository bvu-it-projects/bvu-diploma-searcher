<template>
    <div id="diploma-details">
      <a-spin tip="Loading..." :spinning="isLoading">
      </a-spin>
      <a-result status="404" v-if="isKeyInvalid">
          <template #extra>
            <a-alert message="Liên kết đã hết hạn, vui lòng tra cứu lại !"
              type="error" show-icon v-if="isKeyInvalid">
            </a-alert>
          </template>
        </a-result>

        <div id="details-boxes" v-if="studentInfo.id">
          <div id="student-info-box">
            <div id="avatar-container">
              <div>
                <img :src="avatarSrc" alt="student id" id="img-avatar" ref="imgAvatar">
              </div>

              <div id="biploma-qrcode-container">
                <canvas id="canvas"></canvas>
                <img alt="qr_code" id="qrcode">
              </div>
            </div>

            <div id="tables-container">
              <table>
                <tr>
                  <td>Họ và tên</td>
                  <td>{{ studentInfo.fullName }}</td>
                </tr>
                <tr>
                  <td>Mã sinh viên</td>
                  <td>{{ studentInfo.id }}</td>
                </tr>
                <tr>
                  <td>Ngày sinh</td>
                  <td>{{ studentInfo.dateOfBirth }}</td>
                </tr>
                <tr>
                  <td>Nơi sinh</td>
                  <td>{{ studentInfo.bornAddress }}</td>
                </tr>
                <tr>
                  <td>Giới tính</td>
                  <td>{{ studentInfo.gender }}</td>
                </tr>
                <tr>
                  <td>Ngành</td>
                  <td>{{ studentInfo.department }}</td>
                </tr>
                <tr>
                  <td>Chuyên ngành</td>
                  <td>{{ studentInfo.major }}</td>
                </tr>
                <tr>
                  <td>Bậc đào tạo</td>
                  <td>{{ studentInfo.educateRank }}</td>
                </tr>
              </table>
              <!--  -->
              <table>
                <tr>
                  <td>Loại hình đào tạo</td>
                  <td>{{ studentInfo.educateType }}</td>
                </tr>
                <tr>
                  <td>Khoá học</td>
                  <td>{{ studentInfo.learningYear }}</td>
                </tr>
                <tr>
                  <td>Năm tốt nghiệp</td>
                  <td>{{ studentInfo.graduatedYear }}</td>
                </tr>
                <tr>
                  <td>Xếp loại tốt nghiệp</td>
                  <td>{{ studentInfo.graduatedRank }}</td>
                </tr>
                <tr>
                  <td>Số hiệu văn bằng</td>
                  <td>{{ studentInfo.diplomaNumber }}</td>
                </tr>
                <tr>
                  <td>Ngày cấp</td>
                  <td>{{ studentInfo.issuedDate }}</td>
                </tr>
                <tr>
                  <td>Số QĐTN</td>
                  <td>{{ studentInfo.decisionNumber }}</td>
                </tr>
                <tr>
                  <td>Số vào sổ</td>
                  <td>{{ studentInfo.notedDate }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { BVUSearcher } from '@/services/bvu';
import QrCodeWithLogo from 'qrcode-with-logos';
import {
  Button, Calendar, Input, InputNumber, Alert,
  Form, Layout, FormModel, message, notification,
  DatePicker, Table, Divider, Tag, Spin, Result,
} from 'ant-design-vue';

Vue
  .use(Alert)
  .use(Button)
  .use(Form)
  .use(FormModel)
  .use(DatePicker)
  .use(Table)
  .use(Layout)
  .use(Calendar)
  .use(Tag)
  .use(Result)
  .use(Divider)
  .use(Spin)
  .use(Input)
  .use(InputNumber);

export default Vue.extend({
  data() {
    return {
      isLoading: true,
      isKeyInvalid: false,
      studentInfo: {
        id: '',
        fullName: '',
        dateOfBirth: '',
        bornAddress: '',
        gender: '',

        department: '', //  ngành
        major: '', //  chuyên ngành
        graduatedRank: '',
        learningYear: '', //  khoá học
        graduatedYear: '',

        issuedDate: '',
        decisionNumber: '',

        educateRank: '', //  bậc đào tạo (Đại học | Cao đẳng)
        educateType: '', //  loại hình đào tạo
        diplomaNumber: '', //  số hiệu văn bằng
        notedDate: '', //  ngày vào sổ
      },
    };
  },
  computed: {
    avatarSrc() {
      return `https://sinhvien.bvu.edu.vn/GetImage.aspx?MSSV=${this.studentInfo.id}`;
    },
  },
  created() {
    BVUSearcher.getDiplomaDetails(this.$route.params.key)
      .then((response) => {
        this.studentInfo = response.data;
        console.log(this.studentInfo);
      })
      .catch((err) => {
        console.log(err);
        this.isKeyInvalid = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  mounted() {
    //  load the QR Code
    if (this.studentInfo.biplomaReferenceUrl) {
      new QrCodeWithLogo({
        canvas: document.getElementById('canvas'),
        content: this.studentInfo.biplomaReferenceUrl,
        width: 380,
        download: true,
        image: document.getElementById('qrcode'),
        logo: {
          src: process.env.VUE_APP_BIPLOMA_QR_LOGO,
        },
      }).toImage();
    }
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
  #diploma-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #details-boxes {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;

      #student-info-box {
        background: url('../assets/diploma-border.png');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;

        $space: 75px;
        $border-color: #004a90;

        text-align: center;
        padding: 0 80px 50px;

        margin: 100px 0 30px;
        // border: 2px solid $border-color;
        // border-radius: 20px;

        #avatar-container {
          transform: translateY(-$space);
          display: flex;
          justify-content: space-around;

          div:first-child {
            display: inline-block;
            width: 150px;
            height: 150px;

            overflow: hidden;
            background: white;
            border-radius: 50%;
            border: 2px solid rgb(212, 212, 0);
            // border: 2px double $border-color;

            #img-avatar {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .fullName {
            font-weight: bold;
            font-size: 20px;
            color: #004a90;
            margin-top: 15px;

            padding: 10px;
            border-bottom: 1px solid $border-color;
          }
        }

        #tables-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;

          margin-top: -80px;

          table {
            tr {
              td {
                padding: 10px 10px 10px 0;
                text-align: left;

                &:first-of-type {
                  font-weight: 600;
                  color: $border-color;

                  position: relative;
                  // &::after {
                  //   content: ': ';
                  // }
                }
              }
            }

            &:first-child {
              justify-self: start;
            }
            &:last-child {
              justify-self: end;
            }
          }
        }
      }
    }
  }
</style>
