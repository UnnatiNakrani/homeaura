import PageHeader from "../../components/admin/PageHeader";
import AdminCard from "../../components/admin/AdminCard";

function Dashboard() {
    return (
        <>
            <PageHeader title="Dashboard" />

            <div className="row g-4">

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Total Revenue"
                        value="₹85,500"
                        icon="bi-currency-rupee"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Total Orders"
                        value="156"
                        icon="bi-bag-check"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Products"
                        value="48"
                        icon="bi-box-seam"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Users"
                        value="320"
                        icon="bi-people"
                    />
                </div>

            </div>
            
        </>
    );
}

export default Dashboard;