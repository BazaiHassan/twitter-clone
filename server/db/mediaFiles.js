import { prisma } from "."

export const craeteMediaFile = (mediaFile) => {
    return prisma.mediaFile.create({
        data:mediaFile
    })
}