import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { PrismaService } from './prisma.service';

@Module({
    controllers: [],
    providers: [
        /* {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
          }, */
        PrismaService],
    exports: [PrismaService]
})
export class CoreModule {}
