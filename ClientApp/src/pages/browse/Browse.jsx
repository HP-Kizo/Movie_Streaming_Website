import React from "react";
import Banner from "../component/Banner/Banner";
import NavBar from "../component/NavBar/NavBar";
import Movielist from "../component/Movie/MovieList";
import useSendRequest from "../CustomHook/useSendRequest";

function Browse() {
  return (
    <div className="app">
      {/* <h1>Search</h1> */}
      <NavBar></NavBar>
      <Banner></Banner>
      <Movielist></Movielist>
    </div>
  );
}

export default Browse;
