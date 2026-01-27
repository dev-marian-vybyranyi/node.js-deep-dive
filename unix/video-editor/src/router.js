const User = require("./controllers/user");
const Video = require("./controllers/video");

module.exports = (server) => {

  server.route("post", "/api/login", User.logUserIn);

  server.route("delete", "/api/logout", User.logUserOut);

  server.route("get", "/api/user", User.sendUserInfo);

  server.route("put", "/api/user", User.updateUser);

  server.route("get", "/api/videos", Video.getVideos);

  server.route("post", "/api/upload-video", Video.uploadVideo);

  server.route("patch", "/api/video/extract-audio", Video.extractAudio);

  server.route("put", "/api/video/resize", Video.resizeVideo);

  server.route("get", "/get-video-asset", Video.getVideoAsset);
};
