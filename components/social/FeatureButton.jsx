export default function FeatureButton({ text, imageBgPosition }) {
  return (
    <button className="px-4 py-2 flex items-center  justify-center space-x-2 hover:bg-blue-600 rounded-lg ">
      <i
        style={{
          backgroundImage: `url("https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/jrzbj1_5Jys.png")`,
          backgroundPosition: imageBgPosition,
        }}
        className="bg-no-repeat bg-auto w-6 h-6 inline-block"
      ></i>

      <span className="text-gray-600 font-medium hidden md:block dark:text-white">
        {text}
      </span>
    </button>
  );
}
