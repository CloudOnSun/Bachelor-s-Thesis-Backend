import {Damage, RFS} from "@prisma/client";

export type RfsWithDamages = {predictedCracks: Damage[]} & RFS