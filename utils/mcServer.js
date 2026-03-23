/**
 * Utility module for interacting with the Minecraft server.
 * Provides safe functions for checking the server status without spamming logs.
 *
 * @module utils/mcServer
 */

const util = require('minecraft-server-util');
const logger = require('./logger');

let lastStatus = null; // 'online' or 'offline'
let firstOnlineTime = null;

/**
 * Pings the Minecraft server and retrieves live status info.
 * Handles timeouts and gracefully manages offline states.
 *
 * @param {string} ip - The IP or domain of the Minecraft server.
 * @param {number} port - The port of the Minecraft server.
 * @returns {Promise<Object|null>} Server data object if online, null if offline.
 */
async function getServerStatus(ip, port) {
  try {
    const result = await util.status(ip, port, {
      timeout: 3000,
      enableSRV: true
    });

    if (lastStatus !== 'online') {
      logger.success('Minecraft Server is online and reachable.');
      lastStatus = 'online';
      
      if (!firstOnlineTime) {
        firstOnlineTime = Date.now();
      }
    }

    return {
      online: true,
      players: result.players.online,
      maxPlayers: result.players.max,
      sample: result.players.sample || [],
      motd: result.motd.clean,
      version: result.version.name
    };
  } catch (err) {
    if (lastStatus !== 'offline') {
      logger.warn(`Minecraft Server went offline or is unreachable: ${err.message}`);
      lastStatus = 'offline';
      firstOnlineTime = null;
    }
    return null;
  }
}

/**
 * Calculates the uptime string based on the first successful online ping.
 *
 * @returns {string} The formatted uptime string (Xd Xh Xm Xs), or offline message.
 */
function getUptime() {
  if (!firstOnlineTime || lastStatus !== 'online') return 'Server offline';

  const diffMs = Date.now() - firstOnlineTime;
  const diffSecs = Math.floor(diffMs / 1000);
  const d = Math.floor(diffSecs / 86400);
  const h = Math.floor((diffSecs % 86400) / 3600);
  const m = Math.floor((diffSecs % 3600) / 60);
  const s = diffSecs % 60;

  return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = {
  getServerStatus,
  getUptime
};
