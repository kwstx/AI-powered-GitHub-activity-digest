import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.id = account.providerAccountId;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            session.accessToken = token.accessToken as string;
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + "/dashboard";
        }
    },
    pages: {
        signIn: "/login",
    },
})
