export default {
  state: () => ({
    items: [
      {
        title: 'Trang chủ',
        icon: 'pulse-outline',
        href: '/',
      },
      {
        title: 'Tin nhắn',
        icon: 'mail-open-outline',
        href: '/messages',
        children: [
          {
            title: 'Chung',
            href: '/add',
          },
          {
            title: 'Các phòng',
            href: '/list',
          },
        ],
      },
      {
        title: 'Thông báo',
        icon: 'megaphone-outline',
        href: '/notifications',
        children: [
          {
            title: 'Tạo thông báo mới',
            href: '/add',
          },
          {
            title: 'Danh sách thông báo',
            href: '/list',
          },
        ],
      },
      {
        title: 'Người dùng',
        icon: 'lock-open-outline',
        href: '/users',
        children: [
          {
            title: 'Người quản lí',
            icon: 'key-outline',
            href: 'managers',
            children: [
              {
                title: 'Cấp tài khoản mới',
                href: '/import',
              },
              {
                title: 'Danh sách tài khoản',
                href: '/debt',
              },
            ],
          },
          {
            title: 'Sinh viên',
            icon: 'school-outline',
            href: '/students',
            children: [
              {
                title: 'Danh sách sinh viên',
                href: '/list',
              },
              {
                title: 'Danh sách công nợ',
                href: '/debt',
              },
              {
                title: 'Nhập thông tin',
                href: '/import',
              },
            ],
          },
        ],
      },
      {
        title: 'Phòng',
        icon: 'business-outline',
        href: '/rooms',
        children: [
          {
            title: 'Sơ đồ phòng',
            href: '/list',
            icon: 'map-outline',
          },
          {
            title: 'Trang thiết bị',
            icon: 'bulb-outline',
            href: 'items',
            children: [
              {
                title: 'Danh sách thiết bị',
                href: '/list',
              },
              {
                title: 'Thêm thiết bị',
                href: '/add',
              },
            ],
          },
          {
            title: 'Dịch vụ',
            icon: 'egg-outline',
            href: 'services',
            children: [
              {
                title: 'Danh sách dịch vụ',
                href: '/list',
              },
              {
                title: 'Thêm dịch vụ',
                href: '/add',
              },
            ],
          },
          {
            title: 'Yêu cầu sửa chữa',
            icon: 'build-outline',
            href: 'fixes',
            children: [
              {
                title: 'Đang chờ',
                href: '/requesting',
              },
              {
                title: 'Lịch sử',
                href: '/history',
              },
            ],
          },
        ],
      },
      {
        title: 'Hóa đơn',
        icon: 'card-outline',
        href: '/invoices',
        children: [
          {
            title: 'Danh sách hóa đơn',
            href: '/list',
          },
          {
            title: 'Nhập mới',
            href: '/add',
          },
        ],
      },
      {
        title: 'Báo cáo - Thống kê',
        icon: 'reader-outline',
        href: '/reports',
        children: [
          {
            title: 'Công nợ',
            href: '/debt',
          },
          {
            title: 'Sinh viên',
            href: '/students',
          },
          {
            title: 'Thiết bị',
            href: '/items',
          },
        ],
      },
    ],
  }),
};
