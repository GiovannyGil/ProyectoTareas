import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false, length: 200})
    uuid: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    edad: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: 1, type: 'binary'})
    estado: boolean;
    
    @Column()
    createAt: Date;

    @Column()
    updateAt: Date;

    @Column()
    deleteAt: Date;

}
