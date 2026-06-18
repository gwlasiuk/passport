document.addEventListener('DOMContentLoaded', () => {
    
    const links = document.querySelectorAll('.resource-link');
    const entries = document.querySelectorAll('.entry');
    const stampCountDisplay = document.getElementById('stamp-count');
    const progressFill = document.getElementById('progress-fill');
    
    const totalStamps = links.length;

    // --- NEW: Load saved progress from localStorage ---
    // This grabs the array of clicked link indexes, or starts an empty array if it's your first visit
    let stampedIndexes = JSON.parse(localStorage.getItem('passportStamps')) || [];
    let stampsCollected = stampedIndexes.length;

    // Function to handle the math and giant stamp
    const updateProgressUI = () => {
        stampCountDisplay.innerText = stampsCollected;
        const percentage = (stampsCollected / totalStamps) * 100;
        progressFill.style.width = percentage + '%';

        // Slam the giant stamp if all are collected
        if (stampsCollected === totalStamps) {
            setTimeout(() => {
                document.querySelector('.right-page').classList.add('all-approved');
            }, 600); 
        }
    };

    // --- NEW: Restore stamps automatically on page load ---
    stampedIndexes.forEach(index => {
        if(entries[index]) {
            // Instantly apply the stamp class without the delay so they are there when the page loads
            entries[index].classList.add('is-stamped');
        }
    });
    
    // Set the progress bar width on page load
    updateProgressUI();

    // --- The Click Listener ---
    links.forEach((link, index) => {
        link.addEventListener('click', function() {
            
            const entry = this.closest('.entry');

            if (!entry.classList.contains('is-stamped')) {
                
                setTimeout(() => {
                    entry.classList.add('is-stamped');
                    
                    // Update our variables
                    stampsCollected++;
                    
                    // Save this specific link's index to localStorage so the browser remembers it
                    stampedIndexes.push(index);
                    localStorage.setItem('passportStamps', JSON.stringify(stampedIndexes));
                    
                    // Trigger the UI updates
                    updateProgressUI();
                    
                }, 100);
            }
        });
    });
});
