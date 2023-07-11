export const statusColor = (status) => {
    if (status === "Pending" || status === "Pending")
        return "orange";
    else if (status === "Confirm" || status === "confirm")
        return "green";
    else if (status === "completed" || status === "Completed")
        return "blue";
    else if (status === "cancelled" || status === "Cancelled")
        return "red";
    else
        return "cyan"

}