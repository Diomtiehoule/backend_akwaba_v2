import axios from "axios";

const ResidenceService = {
    getResidence : async (req : any , res : any , next : any) => {
        try{
            const response = await axios.get('https://ivoiretravel.ci/api/space/get-all');
            if(!response.data)return res.status(404).json({message : "La liste est vide"});
            res.status(200).json({message : "La liste de package..." , data : response.data})
        }catch(err : any){
            console.log(`L'erreur : ${err}`);
        }
        
    }
}
export default ResidenceService