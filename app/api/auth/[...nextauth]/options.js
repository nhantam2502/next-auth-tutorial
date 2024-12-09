import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        let userRole = "GitHub User";
        if (profile?.email == "nhantamhd@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      
      async authorize(credentials) {
        try {
          // Gửi yêu cầu GET đến MockAPI để tìm người dùng theo email
          const response = await axios.get(
            `https://6755e59111ce847c992b7f7d.mockapi.io/api/v1/login/account?email=${credentials.email}`
          );
    
          // Kiểm tra nếu tìm thấy người dùng
          const user = response.data[0];

          if (user) {
            if (credentials.password === user.password) {
              return {
                id: user.id,
                email: user.email,
                role: user.role, 
              };
            }
          }
        } catch (error) {
          console.error("Error authorizing user:", error);
        }
    
        // Trả về null nếu không hợp lệ
        return null;
      },
    })
  
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },  
  
};
