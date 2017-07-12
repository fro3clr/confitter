import Faye from "faye";
import config from "../config/config";

const ClientAuthExt = function() {};

ClientAuthExt.prototype.outgoing = function(message, callback) {
  if (message.channel == "/meta/handshake") {
    if (!message.ext) {
      message.ext = {};
    }
    message.ext.token = config.token;
  }

  callback(message);
};

ClientAuthExt.prototype.incoming = function(message, callback) {
  if (message.channel == "/meta/handshake") {
    if (message.successful) {
      console.log(
        "Successfuly subscribed to room: ",
        "58f64503d73408ce4f593fe5"
      );
    } else {
      console.log("Something went wrong: ", message.error);
    }
  }

  callback(message);
};

// Snapshot extension

var SnapshotExt = function() {};

ClientAuthExt.prototype.incoming = function(message, callback) {
  if (
    message.channel == "/meta/subscribe" &&
    message.ext &&
    message.ext.snapshot
  ) {
    console.log("Snapshot: ", message.ext.snapshot);
  }

  callback(message);
};

// Faye client

const client = new Faye.Client("https://ws.gitter.im/faye", config.faye);

// Add Client Authentication extension
client.addExtension(new ClientAuthExt());

// Add Resource Snapshot extension client.addExtension(new SnapshotExt()); A
// dummy handler to echo incoming messages
var messageHandler = function(msg) {
  console.log(msg);
};

export default client;
