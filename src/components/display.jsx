import { Route, Routes} from "react-router-dom";
import DisplayHome from "./displayhome";
import Movies from "./moviesdisplay";
import SongDetails from "./songsdisplay";
import CreatePlaylistPage from "./addtoplaylist";
import Navbar from "./navbar";
import LoginForm from "./login";
import Player from "./player";
import { useTheme } from '../context/themecontext'

const Display = () => {
  const { theme } = useTheme(); 

  return (
    <div className="m-2 mb-32 px-6 pt-4 rounded  overflow-auto lg:w-[100%] lg:ml-0"style={{
      backgroundColor: theme === "dark" ? "black" : "white",
      color: theme === "dark" ? "white" : "black",
    }} id="Home">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/albums/:id" element={<Movies />} />
        <Route path="/song-details" element={<SongDetails />} />
        <Route path="/create-playlist" element={<CreatePlaylistPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<Navbar />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </div>
  );
};

export default Display;
