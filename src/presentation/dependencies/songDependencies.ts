import { GetSongById } from "../../application/use-cases/GetSongById";
import { GetSongs } from "../../application/use-cases/GetSongs";
import { LocalSongRepository } from "../../infrastructure/repositories/LocalSongRepository";

const songRepository = new LocalSongRepository();

export const getSongs = new GetSongs(songRepository);
export const getSongById = new GetSongById(songRepository);
