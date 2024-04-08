import SearchBar from "./components/HomePageComponents/SearchBar";
import HomeScreen from "./components/HomePageComponents/HomeScreen";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <SearchBar />
      <HomeScreen />
    </div>
  );
};

export default Home;
