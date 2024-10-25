import { ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { connectToDB } from "../../lib/mongodb";
import Head from "next/head";
const MeetupDetailPage = (props) => {
  // console.log("MEETUP : ", props.meetup);
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description}/>
      </Head>
      <MeetupDetail {...props.meetup} />
    </>
  );
};

export default MeetupDetailPage;
export async function getStaticPaths() {
  const client = await connectToDB();
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  const paths = meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } }));
  return {
    fallback: false,
    paths: paths,
  };
}
export async function getStaticProps(context) {
  // console.log("Context : ", context);
  const meetupId = context.params.meetupId;
  const client = await connectToDB();
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });
  delete selectedMeetup._id;
  return {
    props: {
      meetup: selectedMeetup,
    },
  };
}
