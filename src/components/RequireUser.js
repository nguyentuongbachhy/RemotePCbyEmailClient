import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireUser = (WrappedComponent) => {
    const WithUserCheck = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            } else {
                return;
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };

    WithUserCheck.propTypes = {
    };

    return WithUserCheck;
};

export default RequireUser;
