import Chat from "@/components/chat/Chat";
import SidebarToggle from "../SidebarToggle";

async function ChatWrapper() {
  const profile = {
    _id: "profile-1",
    _type: "profile",
    _createdAt: "2025-01-01T00:00:00.000Z",
    _updatedAt: "2025-01-02T00:00:00.000Z",
    _rev: "1-abc123",
    firstName: "John",
  lastName: "Talsangi",
  headline: "Full-Stack Developer",
    shortBio: "Experienced developer building web applications with React, Next.js and Node.js.",
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
    availability: "Open to work",
    socialLinks: {
      github: "https://github.com/vijay-talsangi",
      linkedin: "https://www.linkedin.com/in/vijay-talsangi"
    },
    yearsOfExperience: 6,
    profileImage: "https://drive.google.com/file/d/1s_OYQJBDF8JgNws6sXyAO626YSXIXj1u/view?usp=sharing"
  };

  return (
    <div className="h-full w-full">
      <div className="md:hidden p-2 sticky top-0 z-10">
        <SidebarToggle />
      </div>

      <Chat profile={profile as any} />
    </div>
  );
}

export default ChatWrapper;
