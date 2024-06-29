import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({

   providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_ID || "",
        clientSecret:process.env.GOOGLE_SECRET || ""
    }),
    GitHubProvider({
        clientId:process.env.GITHUB_ID || "",
        clientSecret:process.env.GITHUB_SECRET || ""
      })

   ],
   secret:process.env.NEXTAUTH_SECRET,
   callbacks:{
    jwt:({token,user})=>{
        // console.log(token);
        token.userId = token.sub;
        return token;
    },
    session:({session,token,user}:any)=>{
       if(session && session.user){
        session.user.id = token.userId;
       }
       return session;
    }
   }

})

export {handler as GET,handler as POST}


