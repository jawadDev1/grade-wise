import ClassModal from "@/components/modules/ClassModal";
import { getClasses } from "@/services/teacher";

import ClassCard from "@/components/cards/ClassCard";

const DashboardPage = async () => {
  const classesRes = await getClasses();
  const { classes } = await classesRes.json();

  const { teaching, learning } = classes;

  return (
    <main className="min-h-screen px-8 py-12 ">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-primary">My Dashboard</h1>
        <ClassModal />
      </div>

      {teaching && teaching.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Teaching</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teaching.map((cls) => (
              <ClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        </section>
      )}
      {learning && learning.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Enrolled</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learning.map((cls) => (
              <ClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default DashboardPage;
