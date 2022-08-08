import { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../context/AuthProvider";

const Profile: NextPage = () => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Manage Profile | Pastore</title>
      </Head>
    </>
  );
};

export default Profile;
