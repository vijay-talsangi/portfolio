import Chat from "@/components/chat/Chat";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const CHAT_PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }`);

async function ChatPage() {
  const { data: profile } = await sanityFetch({ query: CHAT_PROFILE_QUERY });

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full pb-20">
        <Chat profile={profile} />
      </div>
    </div>
  );
}

export default ChatPage;
