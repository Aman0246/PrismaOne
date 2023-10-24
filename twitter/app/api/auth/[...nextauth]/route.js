import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId:process.env.CLIENTID,
          clientSecret: process.env.CLIENTSECERET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
      ],
    //   secret:process.env.JWT
})

export { handler as GET, handler as POST }