<template>
    <div id="diploma-details">
      <a-spin tip="Loading..." :spinning="isLoading">
      </a-spin>
      <a-result status="404" v-if="isKeyInvalid">
          <template #extra>
            <a-alert message="Liên kết đã hết hạn, vui lòng tra cứu lại !"
              type="error" show-icon>
            </a-alert>
          </template>
        </a-result>

        <div id="details-boxes" v-if="!isKeyInvalid">
          <div id="student-info-box">
            <div id="student-info-box-header">
              <div id="avatar-container">
                <img :src="avatarSrc" alt="student avatar" id="img-avatar" ref="imgAvatar">
              </div>
            </div>

            <div id="student-info-box-middle">
              <div id="biploma-qrcode-container" v-show="studentInfo.biplomaReferenceUrl">
                <canvas id="canvas"></canvas>
                <a :href="studentInfo.biplomaReferenceUrl"
                  id="qr-link" target="_blank">Chứng thực Blockchain</a>
                <img alt="qr_code" v-show="false"
                  id="qrcode" src="../assets/biploma-logo.jpg">
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
        this.isKeyInvalid = false;
        this.studentInfo = response.data;

        //  load the QR Code
        if (this.studentInfo.biplomaReferenceUrl) {
          new QrCodeWithLogo({
            canvas: document.getElementById('canvas'),
            content: this.studentInfo.biplomaReferenceUrl,
            width: 150,
            // download: true,
            // image: document.getElementById('qrcode'),
            logo: {
              src: document.getElementById('qrcode').getAttribute('src'),
            },
          }).toImage();
        }
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
    //
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
  #diploma-details {
    padding-top: 50px;
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
        // background: url('../assets/diploma-border.png');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;

        $space: 100px;
        $radius: 10px;
        $yellow-border-color: #FECD08;
        $outer-border-color: #004a90;
        $qrcode-border-color: #9aceff;

        text-align: center;
        margin: 100px 0 30px;
        border: 2px solid $qrcode-border-color;
        border-radius: 20px;

        &-header {
          // transform: translateY(-$space);
          margin-top: -$space;

          display: flex;
          justify-content: space-around;

          #avatar-container {
            order: 2;
            display: inline-block;
            width: 150px;
            height: 200px;

            overflow: hidden;
            background: white;
            border-radius: $radius;
            border: 2px solid $qrcode-border-color;

            #img-avatar {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          /*.fullName {
            font-weight: bold;
            font-size: 20px;
            color: #004a90;
            margin-top: 15px;

            padding: 10px;
            border-bottom: 1px solid $outer-border-color;
          }*/
        }

        &-middle {
          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 20px;
          margin-top: -$space;

          #biploma-qrcode-container {
            width: 150px;

            order: 1;
            overflow: hidden;
            background: white;
            border: 2px solid $qrcode-border-color;
            border-radius: 6px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            #canvas {
              // width: 100% !important;
              // height: 100% !important;
            }

            #qr-link {
              text-decoration: none;
              font-size: 12px;
              padding: 5px;

              width: 100%;

              color:  dodgerblue;
              background: rgb(226, 244, 255);
              border-top: 2px solid $qrcode-border-color;

              transition: all .25s ease-in-out;
              &:hover {
                background: rgb(255, 253, 234);
              }
            }
          }
        }

        #tables-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;

          padding: 20px;
          border-top: 2px solid $qrcode-border-color;

          table {
            tr {
              td {
                padding: 10px 10px 10px 0;
                text-align: left;

                &:first-of-type {
                  font-weight: 600;
                  color: $outer-border-color;

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
