import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredData),
    });
    const data = await response.json();

    console.log("Response Data : ", data);
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Create a New Meetup</title>
        <meta name="description" content="Ready to bring your ideas to life? Use this form to create and host a new meetup! Share your passion and connect with others." />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
