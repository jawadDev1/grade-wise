import Navbar from "@/components/common/Navbar/Index";

export const metadata = {
  title: "GradeWise",
  description:
    "GradeWise is a platform for students to find and share class notes.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
