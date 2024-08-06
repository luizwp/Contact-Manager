document.addEventListener('DOMContentLoaded', function() {
    // Função para aplicar a máscara no campo de telefone
    function applyPhoneMask(value) {
        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses e espaço
        value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona o hífen
        return value;
    }

    const phoneInput = document.getElementById('contact-phone');

    phoneInput.addEventListener('input', function() {
        this.value = applyPhoneMask(this.value);
    });

    // Código existente para abrir o formulário
    document.getElementById('open-add-form').addEventListener('click', function() {
        document.getElementById('contact-form-container').classList.remove('hidden');
        document.getElementById('contact-form').reset();
        document.getElementById('contact-form').dataset.editing = 'false';
        document.getElementById('contact-form').dataset.rowIndex = '';
    });

    // Código existente para fechar o formulário
    document.getElementById('close-form').addEventListener('click', function() {
        document.getElementById('contact-form-container').classList.add('hidden');
    });

    // Código existente para adicionar ou editar contato
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('contact-name').value;
        const phone = document.getElementById('contact-phone').value;
        const email = document.getElementById('contact-email').value;

        if (name && phone && email) {
            const editing = this.dataset.editing === 'true';
            const rowIndex = this.dataset.rowIndex;

            if (editing && rowIndex !== undefined) {
                // Atualizar contato existente
                const row = document.querySelector(`#contact-list tr[data-index="${rowIndex}"]`);
                row.children[0].textContent = name;
                row.children[1].textContent = phone;
                row.children[2].textContent = email;
            } else {
                // Adicionar novo contato
                const contactList = document.getElementById('contact-list');
                const row = document.createElement('tr');
                row.dataset.index = contactList.rows.length;
                row.innerHTML = `
                    <td class="hidden-sm">${name}</td>
                    <td class="hidden-sm">${phone}</td>
                    <td class="hidden-sm">${email}</td>
                    <td>
                        <button class="edit-button">Editar</button>
                        <button class="delete-button">Excluir</button>
                    </td>
                `;
                contactList.appendChild(row);
            }

            // Fechar o formulário
            document.getElementById('contact-form-container').classList.add('hidden');
        }
    });

    // Código existente para editar e excluir contatos
    document.getElementById('contact-list').addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            document.getElementById('contact-name').value = row.children[0].textContent;
            document.getElementById('contact-phone').value = row.children[1].textContent;
            document.getElementById('contact-email').value = row.children[2].textContent;
            document.getElementById('contact-form').dataset.editing = 'true';
            document.getElementById('contact-form').dataset.rowIndex = row.dataset.index;
            document.getElementById('contact-form-container').classList.remove('hidden');
        }

        if (event.target.classList.contains('delete-button')) {
            if (confirm('Tem certeza que deseja excluir este contato?')) {
                const row = event.target.closest('tr');
                row.remove();
            }
        }
    });

    // Código existente para pesquisar contatos
    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const contacts = document.querySelectorAll('#contact-list tr');

        contacts.forEach(contact => {
            const contactName = contact.children[0].textContent.toLowerCase();
            const contactPhone = contact.children[1].textContent.toLowerCase();
            const contactEmail = contact.children[2].textContent.toLowerCase();

            if (contactName.includes(searchTerm) || contactPhone.includes(searchTerm) || contactEmail.includes(searchTerm)) {
                contact.style.display = '';
            } else {
                contact.style.display = 'none';
            }
        });
    });
});