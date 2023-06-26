import serv1 from '../img/serv1.png';
import serv2 from '../img/serv2.png';
import serv3 from '../img/serv3.png';

function Service() {
   
    
    return (
        <div className="row pt-5 gx-5">
            <div className="col-md-4">
                <div className="service-box color1 text-center">
                    <img src={serv1} alt="" />
                    <h4>Subdefy Discover</h4>
                    <p>Not happy with your current subscriptions and don't know where to start? Or, want to find the best value services which you might not have heard of? Subdefy Discover is for you.</p>
                </div>
            </div>
            <div className="col-md-4 mt-100">
                <div className="service-box color2 text-center">
                    <img src={serv2} alt="" />
                    <h4>Subdefy Manage</h4>
                    <p>One location for all of your recurring expenses. Add your monthly commitments to your dashboard and understand what you're spending your money on.re due so you're never hit with a late fee again.</p>
                </div>  
            </div>
            <div className="col-md-4">
                <div className="service-box color3 text-center">
                    <img src={serv3} alt="" />
                    <h4>Subdefy Pay</h4>
                    <p>Split the cost of your monthly recurring expenses equally over your income schedule. Pay weekly, fortnightly or monthly. Manage your cashflow better and remove the stress of multiple transactions with Subdefy Pay.</p>
                </div>
            </div>
        </div>
    )
}

export default Service;


