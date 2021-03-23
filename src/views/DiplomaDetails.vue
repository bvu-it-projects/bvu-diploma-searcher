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
              <h4 class="fullName">{{ studentInfo.fullName }}</h4>
            </div>

            <div id="tables-container">
              <table>
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
                <tr>
                  <td>Loại hình đào tạo</td>
                  <td>{{ studentInfo.educateType }}</td>
                </tr>
              </table>
              <!--  -->
              <table>
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
          <div id="student-doploma-box"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { BVUSearcher } from '@/services/bvu';
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
        // console.log(response.data);
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
        $space: 95px;
        text-align: center;
        padding: 20px;

        margin: $space 0;
        border: 2px solid dodgerblue;
        border-radius: 20px;

        #avatar-container {
          transform: translateY(-$space);

          div {
            display: inline-block;
            width: 150px;
            height: 150px;

            overflow: hidden;
            background: white;
            border-radius: 50%;
            border: 2px dashed dodgerblue;

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
            border-bottom: 2px dashed dodgerblue;
          }
        }

        #tables-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;

          margin-top: -80px;

          table {
            tr {
              td {
                padding: 10px 10px;
                text-align: left;
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
      #student-doploma-box {
        //
      }
    }
  }
</style>
