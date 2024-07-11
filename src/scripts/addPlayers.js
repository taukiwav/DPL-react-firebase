import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase-config";

// THIS IS A ONE TIME SCRIPT TO ADD ROSTERS TO DATABASE

export const useAddPlayers = () => {

    // ZERO GRAVITY ROSTER

    // const teamId = 'Zero Gravity'
    // const players = [
    //   { id: "Kylian Mbappé", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Erling Haaland", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Cristiano Ronaldo", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Neymar Jr.", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Antoine Griezmann", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Luka Modrić", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Mohamed Salah", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Jordi Alba", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Virgil Van Dijk", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Achraf Hakimi", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Marc-Andre Ter Stegen", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Santiago Giménez", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Paulo Dybala", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Sven Botman", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Dayot Upamecano", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Luis Suárez", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Federico Valverde", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Lorenzo Insigne", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Ciro Immobile", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Benoit Costil", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Heung-Min Son", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Edson Álvarez", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Éder Militão", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "João Cancelo", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Jesus Corona", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Raúl Jiménez", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Hirving Lozano", goals: 0, assists: 0, yellow: 0, red: 0 }
    // ];

    // INTER MARINE ROSTER

    // const teamId = 'Inter Marine'
    // const players = [
    //   { id: "Sadio Mané", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Lionel Messi", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Neymar Jr.", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Bernardo Silva", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Kevin De Bruyne", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Mohamed Salah", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Andrew Robertson", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Giorgio Chiellini", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Kostas Manolas", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Achraf Hakimi", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Alisson", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Cristiano Ronaldo", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Erling Haaland", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Vinícius Júnior", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Kylian Mbappé", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Ángel Di María", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Karim Benzema", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Christian Pulisic", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "N'Golo Kanté", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Raheem Sterling", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Heung-Min Son", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Andrés Guardado", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Paulo Dybala", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Raúl Jiménez", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Hirving Lozano", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Jesús Corona", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Dries Mertens", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Juan Jesus", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Iñaki Williams", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Marcus Rashford", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Phil Jones", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Guillermo Ochoa", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Adnan Januzaj", goals: 0, assists: 0, yellow: 0, red: 0 },
    // ];

    // EMPERORS ALLIANCE ROSTER

    // const teamId = "Emperors Alliance"
    // const players = [
    //   { id: "Federico Chiesa", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Randal Kolo Muani", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Manfred Ugalde", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Lucas Paquetá", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Yoane Wissa", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Kelechi Nwakali", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Andrew Robertson", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Moussa Niakhaté", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Antonio Rüdiger", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Kyle Walker", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Marc-André Ter Stegen", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Alex Moreno", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Alejandro Catena", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Kieran Trippier", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Pepê", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Pathé Ciss", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Hirving Lozano", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Dominik Livaković", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Tiago Dantas", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Virgil Van Dijk", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Nico Williams", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Darwin Núñez", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Jon Moncayola", goals: 0, assists: 0, yellow: 0, red: 0 },
    //   { id: "Oliver Sonne", goals: 0, assists: 0, yellow: 0, red: 0 }
    // ];

    const teamId = "Test Team 1"

    const players = [
        { id: "Neymar Jr.", goals: 0, assists: 0, yellow: 0, red: 0 },
        { id: "Bernardo Silva", goals: 0, assists: 0, yellow: 0, red: 0 },
        { id: "Kevin De Bruyne", goals: 0, assists: 0, yellow: 0, red: 0 },
        { id: "Mohamed Salah", goals: 0, assists: 0, yellow: 0, red: 0 }
    ];


    // const teamId = "Test Team 2"

    // const players = [
    //     { id: "Kylian Mbappé", goals: 0, assists: 0, yellow: 0, red: 0 },
    //     { id: "Erling Haaland", goals: 0, assists: 0, yellow: 0, red: 0 },
    //     { id: "Cristiano Ronaldo", goals: 0, assists: 0, yellow: 0, red: 0 }
    // ];

    
    const batchAddPlayers = async () => {
        const batch = writeBatch(db)
    
        players.forEach((player) => {
            const playerRef = doc(collection(db, `teams/${teamId}/roster`), player.id)
            batch.set(playerRef,player)
        })
    
        try {
            await batch.commit()
            console.log('Batch write succeeded')
        } catch (error) {
            console.error('error writing batch: ', error)
        }
    }
    
    return {batchAddPlayers}

}