import React from 'react'
import Header from "../../../components/Header";

const AllUsers = () => {
    const user = {name: 'Kasif'};
    return (
        <main className="dashboard wrapper">
            <Header
                title="Manage Users"
                description="Filter, sort, and access detailed user profiles" />
            All users Page contents

        </main>
    )
}
export default AllUsers
