import axios from "axios";

const packageService = {
    getAllPackage : async (req : any , res : any , next : any) => {
        try {
           const response = await axios.get("https://ivoiretravel.ci/api/get-all-offers")
           res.status(200).json({message : "La liste de package..." , data : response.data})
        } catch (error : any) {
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message : "une erreur s'est produite lors du traitement !" , err : error.message})
        }
    },
    getPackage : async (req : any, res : any, next : any) => {
        try {
          const {id} = req.params;
          console.log(`l'id : ${id}`);
          if (!id) {
            return res.status(400).json({ message: "Identifiant du package manquant" });
          }
          const response = await axios.get(`https://ivoiretravel.ci/api/get-offer/${id}`);
          if (!response.data) {
            return res.status(404).json({ message: "Package non trouvé" });
          }
          res.status(200).json({ message: "Le package trouvé", data: response.data });
        } catch (error : any) {
          console.error(`Erreur lors de la récupération du package : ${error.message}`);
          res.status(500).json({ message: "Une erreur s'est produite lors du traitement", error: error.message });
        }
      }
}

export default packageService;