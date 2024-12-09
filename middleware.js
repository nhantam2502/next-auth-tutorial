// withAuth: Đây là một hàm được cung cấp bởi next-auth,
// dùng để tạo middleware xác thực. Nó kiểm tra xem người dùng
// đã đăng nhập hay chưa và có quyền truy cập vào tuyến đường được bảo vệ không.
import { withAuth } from "next-auth/middleware";

// NextResponse: Được sử dụng để thao tác với phản hồi (vd: chuyển hướng, chặn truy cập)
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token;

    if (
      req.nextUrl.pathname.startsWith("/AdminPage") &&
      (!token || token.role !== "admin")
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/Nurse") &&
      (!token || token.role !== "nurse")
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      authorize: ({ token }) => !!token, // Kiểm tra nếu token tồn tại
    },
  }
);

// Nếu người dùng chưa đăng nhập mà cố gắng truy cập /AdminPage,
// họ sẽ được chuyển hướng đến trang đăng nhập của NextAuth.

// config: Là cấu hình chỉ định các tuyến đường mà middleware sẽ được áp dụng.
// matcher chỉ định các tuyến đường mà middleware sẽ áp dụng.
export const config = { matcher: ["/AdminPage", "/Nurse"] };
