// Upload Gallery JavaScript

class UploadGallery {
    constructor() {
        this.uploadedItems = JSON.parse(localStorage.getItem('uploadedItems')) || [];
        this.selectedFiles = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderGallery();
        this.hidePreloader();
    }

    hidePreloader() {
        setTimeout(() => {
            document.getElementById('js-preloader').classList.add('loaded');
        }, 1000);
    }

    setupEventListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadForm = document.getElementById('uploadForm');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Upload area click
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });

        // Form submission
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.uploadFiles();
        });

        // Filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterGallery(btn.dataset.filter);
            });
        });
    }

    handleFiles(files) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
        const maxSize = 50 * 1024 * 1024; // 50MB

        Array.from(files).forEach(file => {
            if (!validTypes.includes(file.type)) {
                this.showMessage('Please select valid image or video files only.', 'error');
                return;
            }

            if (file.size > maxSize) {
                this.showMessage('File size should be less than 50MB.', 'error');
                return;
            }

            this.selectedFiles.push(file);
        });

        this.renderPreview();
    }

    renderPreview() {
        const previewArea = document.getElementById('previewArea');
        previewArea.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';

            const mediaElement = file.type.startsWith('image/') 
                ? document.createElement('img')
                : document.createElement('video');

            mediaElement.src = URL.createObjectURL(file);
            if (mediaElement.tagName === 'VIDEO') {
                mediaElement.controls = false;
                mediaElement.muted = true;
            }

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = () => this.removeFile(index);

            previewItem.appendChild(mediaElement);
            previewItem.appendChild(removeBtn);
            previewArea.appendChild(previewItem);
        });
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.renderPreview();
    }

    async uploadFiles() {
        if (this.selectedFiles.length === 0) {
            this.showMessage('Please select at least one file to upload.', 'error');
            return;
        }

        const title = document.getElementById('mediaTitle').value;
        const description = document.getElementById('mediaDescription').value;
        const eventType = document.getElementById('eventType').value;
        const eventDate = document.getElementById('eventDate').value;

        if (!title || !eventType) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        this.showLoading(true);

        // Simulate upload process
        await this.delay(2000);

        this.selectedFiles.forEach(file => {
            const item = {
                id: Date.now() + Math.random(),
                title: title,
                description: description,
                eventType: eventType,
                eventDate: eventDate,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                fileName: file.name,
                fileSize: file.size,
                uploadDate: new Date().toISOString(),
                dataUrl: URL.createObjectURL(file)
            };

            this.uploadedItems.push(item);
        });

        // Save to localStorage
        localStorage.setItem('uploadedItems', JSON.stringify(this.uploadedItems));

        this.showLoading(false);
        this.showMessage('Files uploaded successfully!', 'success');
        this.resetForm();
        this.renderGallery();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showLoading(show) {
        const uploadBtn = document.getElementById('uploadBtn');
        if (show) {
            uploadBtn.disabled = true;
            uploadBtn.innerHTML = '<div class="spinner"></div> Uploading...';
        } else {
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = '<i class="fa fa-upload"></i> Upload Media';
        }
    }

    resetForm() {
        document.getElementById('uploadForm').reset();
        this.selectedFiles = [];
        document.getElementById('previewArea').innerHTML = '';
    }

    renderGallery() {
        const galleryContainer = document.getElementById('galleryContainer');
        galleryContainer.innerHTML = '';

        if (this.uploadedItems.length === 0) {
            galleryContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div style="padding: 60px 20px; color: #666;">
                        <i class="fa fa-images" style="font-size: 48px; margin-bottom: 20px; display: block;"></i>
                        <h4>No uploads yet</h4>
                        <p>Upload your first image or video to see it here!</p>
                    </div>
                </div>
            `;
            return;
        }

        this.uploadedItems.reverse().forEach(item => {
            const galleryItem = this.createGalleryItem(item);
            galleryContainer.appendChild(galleryItem);
        });
    }

    createGalleryItem(item) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 gallery-item';
        col.dataset.type = item.type;

        const mediaElement = item.type === 'image' 
            ? `<img src="${item.dataUrl}" alt="${item.title}">`
            : `<video src="${item.dataUrl}" muted></video>`;

        const playIcon = item.type === 'video' 
            ? '<div class="media-overlay"><i class="fa fa-play play-icon"></i></div>'
            : '<div class="media-overlay"><i class="fa fa-search-plus play-icon"></i></div>';

        col.innerHTML = `
            <div class="gallery-card" onclick="uploadGallery.openModal('${item.id}')">
                <div class="gallery-media">
                    ${mediaElement}
                    ${playIcon}
                </div>
                <div class="gallery-info">
                    <h4>${item.title}</h4>
                    <p>${item.description || 'No description provided.'}</p>
                    <div class="gallery-meta">
                        <span class="event-type">${item.eventType}</span>
                        <span>${new Date(item.uploadDate).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `;

        return col;
    }

    filterGallery(filter) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.type === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    openModal(itemId) {
        const item = this.uploadedItems.find(i => i.id == itemId);
        if (!item) return;

        const modal = new bootstrap.Modal(document.getElementById('mediaModal'));
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const modalInfo = document.getElementById('modalInfo');

        modalTitle.textContent = item.title;

        const mediaElement = item.type === 'image'
            ? `<img src="${item.dataUrl}" alt="${item.title}" class="img-fluid">`
            : `<video src="${item.dataUrl}" controls class="img-fluid"></video>`;

        modalBody.innerHTML = mediaElement;

        modalInfo.innerHTML = `
            <h6>Event Details</h6>
            <p><strong>Type:</strong> ${item.eventType}</p>
            <p><strong>Date:</strong> ${item.eventDate || 'Not specified'}</p>
            <p><strong>Uploaded:</strong> ${new Date(item.uploadDate).toLocaleDateString()}</p>
            <p><strong>Description:</strong> ${item.description || 'No description provided.'}</p>
        `;

        modal.show();
    }

    showMessage(message, type = 'success') {
        // Create or update message element
        let messageEl = document.querySelector('.message-alert');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'message-alert';
            document.querySelector('.upload-form').prepend(messageEl);
        }

        messageEl.className = `message-alert alert alert-${type === 'success' ? 'success' : 'danger'}`;
        messageEl.textContent = message;
        messageEl.style.display = 'block';

        // Auto hide after 5 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
}

// Initialize the upload gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.uploadGallery = new UploadGallery();
});

// Add some sample data for demonstration (remove this in production)
if (!localStorage.getItem('uploadedItems')) {
    const sampleData = [
        {
            id: 1,
            title: "Beautiful Wedding Ceremony",
            description: "A magical moment captured during the wedding ceremony",
            eventType: "wedding",
            eventDate: "2024-01-15",
            type: "image",
            fileName: "wedding1.jpg",
            uploadDate: new Date().toISOString(),
            dataUrl: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 2,
            title: "Anniversary Celebration",
            description: "50th anniversary celebration with family",
            eventType: "anniversary",
            eventDate: "2024-01-20",
            type: "image",
            fileName: "anniversary1.jpg",
            uploadDate: new Date().toISOString(),
            dataUrl: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ];
    localStorage.setItem('uploadedItems', JSON.stringify(sampleData));
}