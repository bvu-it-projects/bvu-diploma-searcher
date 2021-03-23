<template>
  <div class="home">
    <a-alert message="Vui lòng nhập ít nhất một trường thông tin để tra cứu." type="info" show-icon />
      <br><br><br>

      <a-form-model ref="searchForm" :model="form" :rules="rules" id="search-form">
        <a-form-model-item label="Mã số sinh viên" prop="maSinhVien">
          <a-input allow-clear v-model="form.maSinhVien"></a-input>
        </a-form-model-item>
        <a-form-model-item label="Số hiệu văn bằng" prop="soHieuVanBang">
          <a-input allow-clear v-model="form.soHieuVanBang"></a-input>
        </a-form-model-item>
        <a-form-model-item label="Họ và tên đệm" prop="hoDem">
          <a-input allow-clear v-model="form.hoDem"></a-input>
        </a-form-model-item>
        <a-form-model-item label="Tên" prop="Ten">
          <a-input allow-clear v-model="form.Ten"></a-input>
        </a-form-model-item>
        <a-form-model-item label="Ngày sinh" prop="ngaySinh">
          <a-date-picker :inputReadOnly="true"
            v-model="form.ngaySinh" format="DD-MM-YYYY"
            :showToday="false" valueFormat="DD-MM-YYYY"></a-date-picker>
        </a-form-model-item>
        <a-form-model-item label=" ">
          <a-button type="danger" :loading="isSearchButtonLoading"
            @click="onSearchButtonClick" id="btn-search">Tra cứu</a-button>
        </a-form-model-item>
      </a-form-model>

      <br><br><br>
      <a-table bordered
        :scroll="{ y: 447 }"
        :columns="columns"
        :data-source="diplomas"
        :pagination="pagination"
        :loading="isTableLoading"
        @change="handleTableChange">
          <a slot="key" slot-scope="text" :href="getFullLink(text)"
            class="btn-view-detail" target="_blank">
            <a-tag color="green">Xem chi tiết</a-tag>
          </a>
          <a-tag slot="classification" slot-scope="rank"
            :color="getRankTagColor(rank)">
            {{ rank }}
          </a-tag>
      </a-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { BVUSearcher } from '@/services/bvu';
import {
  Button, Calendar, Input, InputNumber, Alert,
  Form, Layout, FormModel, message, notification,
  DatePicker, Table, Divider, Tag,
} from 'ant-design-vue';

Vue.prototype.$message = message;
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
  .use(Divider)
  .use(Input)
  .use(InputNumber);

function isStringEmpty(str: string): boolean {
  return !str || !str.trim().length;
}

export default Vue.extend({
  data() {
    return {
      isSearchButtonLoading: false,
      isTableLoading: false,
      moment: moment(),
      form: {
        currentPage: 1,
        maSinhVien: '',
        soHieuVanBang: '',
        hoDem: '',
        Ten: 'nhi',
        ngaySinh: '',
      },
      rules: {
        // maSinhVien: [
        //   {
        //     required: true, message: 'Please input Activity name', trigger: '[change, blur]',
        //   },
        // ],
      },

      pagination: {
        pageSize: 20,
        current: 1,
        total: 0,
      },
      columns: [
        {
          title: 'Họ tên',
          dataIndex: 'fullName',
          width: '20%',
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'dateOfBirth',
          width: '20%',
        },
        /* {
          title: 'Xếp loại',
          dataIndex: 'classification',
          width: '20%',
          scopedSlots: { customRender: 'classification' },
        }, */
        {
          title: 'Chi tiết',
          dataIndex: 'key',
          width: '20%',
          scopedSlots: { customRender: 'key' },
        },
      ],
      diplomas: [],
    };
  },
  methods: {
    getRankTagColor(rank: string) {
      switch (rank) {
        case 'Trung bình': return 'red';
        case 'Trung bình khá': return 'blue';
        case 'Khá': return 'cyan';
        case 'Giỏi': return 'orange';
        case 'Xuất sắc': return 'purple';
        default: return 'dodgerblue';
      }
    },
    getFullLink(key: string) {
      return `/${key}`;
    },
    isFormStillBlank() {
      return (
        isStringEmpty(this.form.maSinhVien)
        && isStringEmpty(this.form.soHieuVanBang)
        && isStringEmpty(this.form.hoDem)
        && isStringEmpty(this.form.Ten)
        && isStringEmpty(this.form.ngaySinh)
      );
    },
    onSearchButtonClick() {
      // console.log(this.form);
      if (this.isFormStillBlank()) {
        notification.error({
          message: 'Vui lòng nhập ít nhất một thông tin để tra cứu !',
          description: '',
          placement: 'bottomRight',
        });

        return;
      }

      this.form.currentPage = 1;
      this.pagination.current = 0;
      this.pagination.total = 0;
      this.getData();
    },

    handleTableChange(pagination: any, filters: any, sorter: any) {
      if (this.isFormStillBlank()) {
        notification.error({
          message: 'Vui lòng nhập ít nhất một thông tin để tra cứu !',
          description: '',
          placement: 'bottomRight',
        });

        return;
      }

      this.pagination.current = pagination.current;
      this.form.currentPage = this.pagination.current;
      this.getData();
    },
    getData() {
      // start crawling data
      this.isSearchButtonLoading = true;
      this.isTableLoading = true;

      // form.ngaySinh gets null when clearing the old value in the date picker.
      if (!this.form.ngaySinh) {
        this.form.ngaySinh = '';
      }

      BVUSearcher.getDiploma(this.form)
        .then((response) => {
          // console.log(response.data);
          this.diplomas = response.data.totalPages ? response.data.data : [];
          this.pagination.total = response.data.totalPages * this.pagination.pageSize;

          if (!response.data.totalPages) {
            notification.warn({
              message: 'Không có dữ liệu khớp với thông tin bạn muốn tìm kiếm !',
              description: '',
              placement: 'bottomRight',
            });
          }
        })
        .catch((err) => {
          console.log(err);

          notification.error({
            message: err.message,
            description: '',
            placement: 'bottomRight',
          });
        })
        .finally(() => {
          this.isSearchButtonLoading = false;
          this.isTableLoading = false;
        });
    },
  },
});
</script>

<style lang="scss">
  #content {
    #search-form {
      @media (max-width: 373px) {
        grid-template-columns: 1fr;
      }

      display: grid;
      column-gap: 50px;
      grid-template-columns: 1fr 1fr;

      .ant-input-number, .ant-calendar-picker {
        width: 100%;
      }

      > .ant-row:last-child {
        .ant-col > label::after {
          content: none;
        }
        .ant-btn {
          width: 100%;
        }
      }

      #btn-search {
        background: coral;
        border: none;
      }
    }

    .ant-table-row-cell-break-word:last-child {
      text-align: center;
      .btn-view-detail span {
        cursor: pointer;
      }
    }

    .ant-table-body {
      border-bottom: 1px solid #e8e8e8;
    }

    .ant-pagination-item-active {
      font-weight: 500;
      background: #1890ff;
      a {
        color: white;
      }
    }
  }
</style>
