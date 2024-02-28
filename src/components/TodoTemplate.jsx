export default function TodoWrapper({ children }) {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  return (
    <>
      <section className="min-w-[600px] h-[620px] my-0 mx-auto py-7 px-8 bg-white border rounded-3xl">
        <h1 className="mt-2 mb-6 text-[24px] font-LINESeedKR-Bd">
          {dateString}
        </h1>
        {children}
      </section>
    </>
  );
}
