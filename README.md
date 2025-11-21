# Project UTE Shop - Login & Forgot Password Module

Dự án demo chức năng Đăng nhập, Đăng ký và Quên mật khẩu (với OTP).

## 🌟 Tính năng

*   **Đăng nhập / Đăng ký**: Sử dụng JWT Authentication.
*   **Quên mật khẩu**:
    *   Gửi mã OTP qua email (mô phỏng hoặc thật).
    *   **Chế độ Test**: Mã OTP sẽ hiển thị trực tiếp trên Terminal của Backend (không cần cấu hình email thật).
    *   Xác thực OTP và đặt lại mật khẩu mới.
*   **Giao diện**: ReactJS với Redux Toolkit.

## 🛠️ Cài đặt

Yêu cầu:
*   Node.js
*   MongoDB (đang chạy ở `mongodb://localhost:27017`)

### 1. Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend` (hoặc dùng file có sẵn):

```env
MONGO_URI=mongodb://localhost:27017/ute_shop
JWT_SECRET=secret_key_bat_ky
# Cấu hình email là tùy chọn nếu dùng chế độ Test
```

### 2. Cài đặt Frontend

```bash
cd frontend
npm install
```

## 🚀 Chạy dự án

Bạn cần mở 2 terminal riêng biệt:

**Terminal 1: Chạy Backend**
```bash
cd backend
npm run dev
```
*Server chạy tại: http://localhost:4000*

**Terminal 2: Chạy Frontend**
```bash
cd frontend
npm run dev
```
*Web chạy tại: http://localhost:5173*

## 🧪 Hướng dẫn Test "Quên Mật Khẩu"

Vì đang ở chế độ Test, bạn không cần email thật:

1.  Truy cập `http://localhost:5173/forgot-password`.
2.  Nhập một email bất kỳ (ví dụ: `test@gmail.com`) và nhấn **Gửi OTP**.
3.  Quay lại cửa sổ **Terminal của Backend**.
4.  Bạn sẽ thấy mã OTP hiện ra:
    ```
    🔑 TEST OTP (Copy mã này): 123456
    ```
5.  Copy mã này và nhập vào trang web để đổi mật khẩu.
