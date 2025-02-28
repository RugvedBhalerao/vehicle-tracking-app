document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display the entries on the user panel
    fetch('/entries')
        .then(response => response.json())
        .then(entries => {
            const table = document.getElementById('entriesTable');

            entries.forEach(entry => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${entry.id}</td>
                    <td>${entry.vehicle_no}</td>
                    <td>${entry.driver_name}</td>
                    <td>${entry.total_bags}</td>
                    <td>${entry.good_bags}</td>
                    <td>${entry.good_bags_weight}</td>
                    <td>${entry.bad_bags}</td>
                    <td>${entry.bad_bags_weight}</td>
                    <td>${new Date(entry.in_time).toLocaleString()}</td>
                    <td>
                        <button onclick="editEntry(${entry.id})">Edit</button>
                    </td>
                `;
                table.appendChild(row);
            });
        });
});

// Function to edit an entry
function editEntry(id) {
    // Get the entry data
    fetch(`/entries`)
        .then(response => response.json())
        .then(entries => {
            const entry = entries.find(entry => entry.id === id);
            if (entry) {
                // Pre-fill the form with existing data
                document.querySelector('[name="vehicle_no"]').value = entry.vehicle_no;
                document.querySelector('[name="driver_name"]').value = entry.driver_name;
                document.querySelector('[name="total_bags"]').value = entry.total_bags;
                document.querySelector('[name="good_bags"]').value = entry.good_bags;
                document.querySelector('[name="good_bags_weight"]').value = entry.good_bags_weight;
                document.querySelector('[name="bad_bags"]').value = entry.bad_bags;
                document.querySelector('[name="bad_bags_weight"]').value = entry.bad_bags_weight;
                document.querySelector('[name="in_time"]').value = new Date(entry.in_time).toISOString().slice(0, 16);  // Format date-time

                // Change the form action to update the entry
                const form = document.querySelector('form');
                form.action = `/update-entry`;
                form.method = 'POST';

                // Add the ID to the form as a hidden input
                const inputId = document.createElement('input');
                inputId.type = 'hidden';
                inputId.name = 'id';
                inputId.value = entry.id;
                form.appendChild(inputId);
            }
        });
}
