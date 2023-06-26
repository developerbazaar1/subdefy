import { motion } from "framer-motion";

function Subscription() {

    
    const data = [
        {
            "Name": "GYM MEMBERSHIPS", 
        },
        {
            "Name": "VIDEO STREAMING SERVICES", 
        },
        {
            "Name": "MUSIC STREAMING", 
        },
        {
            "Name": "AUTO INSURANCE", 
        },
        {
            "Name": "HOME INSURANCE", 
        },
        {
            "Name": "CREATOR SUBSCRIPTIONS", 
        },
        {
            "Name": "CELL PHONE PLANS", 
        },
        {
            "Name": "MEAL DELIVERY", 
        },
        {
            "Name": "MORTGAGE", 
        },
        {
            "Name": "LOAN PAYMENTS", 
        },
        {
            "Name": "HEALTH INSURANCE", 
        },
        
    ]
    const listItems = data.map(
        (element, i) => {
            return (
                <div className="col-md-4" key={i}>
                    <motion.h5 className="subscription"
                    animate={{ opacity: 1, scale: 1,  }}
                        transition={{
                            duration: .5,
                            delay: 0.1,
                           
                        }}
                        // initial={{ opacity: 0, scale: 1 }}
                        whileHover={{ opacity: 1, scale: 1.1, }}
                    >
                       {element.Name}
                    </motion.h5>
                </div>
            )
        }
    )
    return (
        <div className="row pt-5 justify-content-center">   
            {listItems}
        </div>
    )
}

export default Subscription;


