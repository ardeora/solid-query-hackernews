function Tailwind() {
  return (
    <div class="fixed bottom-4 left-4 font-mono border border-lime-400 shadow-sm flex items-center justify-center shadow-lime-300 rounded-full px-5 text-lime-500 bg-lime-100 text-sm">
      <span class="sm:hidden">sm</span>
      <span class="hidden sm:block md:hidden">md</span>
      <span class="hidden md:block lg:hidden">lg</span>
      <span class="hidden lg:block xl:hidden">xl</span>
      <span class="hidden xl:block">2xl</span>
    </div>
  );
}

export default Tailwind;
