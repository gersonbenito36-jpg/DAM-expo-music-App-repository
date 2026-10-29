import type { Song } from "../../domain/entities/Song";
import type { SongRepository } from "../../domain/repositories/SongRepository";

export class GetSongs {
  constructor(private readonly repository: SongRepository) {}

  async execute(): Promise<Song[]> {
    return this.repository.getAll();
  }
}
