export default function TodoWrapper({ children }) {
  return (
    <>
      <section className="min-w-[600px] h-[580px] my-0 mx-auto py-7 px-8 bg-white border rounded-3xl">
        <h1 className="mb-2.5 text-[24px] font-LINESeedKR-Bd">To Do List</h1>
        {children}
      </section>
    </>
  );
}
