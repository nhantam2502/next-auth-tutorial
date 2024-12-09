import NextAuth from "next-auth";
import { options } from "./options";


const handler = NextAuth(options);
export { handler as GET, handler as POST };

// Khi bạn sử dụng NextAuth.js trong Next.js, nó sẽ tự động generate các endpoint API để 
// xử lý các chức năng xác thực, mà bạn không cần phải viết logic cụ thể cho từng endpoint.


// Giải thích:
// 1. `import NextAuth from "next-auth"`: Thư viện NextAuth.js được sử dụng để xử lý các chức năng xác thực.
// 2. `import { options } from "./options"`: Các cấu hình xác thực như các provider (GitHub, Google, CredentialsProvider), callbacks, và các cài đặt khác được lưu trữ trong `options`.
// 3. `const handler = NextAuth(options)`: Handler này xử lý các yêu cầu xác thực đến các endpoint `/api/auth/signin`, `/api/auth/callback`, `/api/auth/session`, v.v. Dựa trên cấu hình `options`, nó sẽ tự động phân phối các yêu cầu đến các phương thức xử lý thích hợp.
// 4. `export { handler as GET, handler as POST }`: Exports `handler` để xử lý các yêu cầu HTTP GET và POST. GET thường dùng để lấy thông tin phiên đăng nhập, và POST dùng để xử lý các yêu cầu xác thực như đăng nhập hoặc đăng xuất.

// ### Cách hoạt động:
// - **Endpoint `/api/auth/signin`**: Được sử dụng để hiển thị trang đăng nhập của NextAuth. Khi người dùng truy cập vào đường dẫn này mà chưa đăng nhập, họ sẽ được chuyển hướng đến trang đăng nhập của NextAuth.
// - **Endpoint `/api/auth/callback`**: Được sử dụng sau khi người dùng đã hoàn tất việc đăng nhập (thông qua các provider như GitHub, Google, hoặc CredentialsProvider). Nó sẽ nhận lại người dùng và có thể được sử dụng để chuyển hướng người dùng đến trang mà họ muốn.
// - **Endpoint `/api/auth/session`**: Được sử dụng để trả về thông tin phiên đăng nhập hiện tại của người dùng. Nó sẽ cung cấp thông tin về trạng thái đăng nhập của người dùng và vai trò của họ nếu có.
