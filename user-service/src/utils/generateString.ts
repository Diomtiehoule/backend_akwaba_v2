const generateString = (chaine: string, taille: number) => {
    if (chaine.length === 0) throw new Error('La chaîne de caractères ne peut pas être vide.');
    let randomString = '';
    do {
        randomString = '';
        for (let i = 0; i < taille; i++) {
            randomString += chaine[Math.floor(Math.random() * chaine.length)];
        }
    } while (randomString[0] === '0');
    return randomString.toUpperCase();
}

export default generateString;
