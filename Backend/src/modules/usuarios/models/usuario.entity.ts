import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false, length: 200, type: 'varchar'})
    uuid: string;

    @Column({unique: true, nullable: false, length: 20, type: 'varchar'})
    nombre: string;

    @Column({unique: true, nullable: false, length: 20, type: 'varchar'})
    apellido: string;

    @Column({unique: true, nullable: false, length: 20, type: 'varchar'})
    NombreUsuario: string;

    @Column({nullable: false, type: 'int'})
    edad: number;

    @Column({unique: true, nullable: false, length: 40, type: 'varchar'})
    email: string;

    @Column({nullable: false, length: 100, type: 'varchar'})
    password: string;

    @Column({default: 1, type: 'int'})
    estado: boolean;
    
    @Column({type: 'datetime', nullable: true})
    createAt: Date;

    @Column({type: 'datetime', nullable: true})
    updateAt: Date;

    @Column({type: 'datetime', nullable: true})
    deletedAt: Date;

}
