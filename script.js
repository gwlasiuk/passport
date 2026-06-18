document.addEventListener('DOMContentLoaded', () => {
    
    const links = document.querySelectorAll('.resource-link');
    const stampCountDisplay = document.getElementById('stamp-count');
    const progressFill = document.getElementById('progress-fill');
    
    let stampsCollected = 0;
    const totalStamps = links.length;

    links.forEach(link => {
        link.addEventListener('click', function() {
            
            const entry = this.closest('.entry');

            if (!entry.classList.contains('is-stamped')) {
                
                setTimeout(() => {
                    entry.classList.add('is-stamped');
                    
                    stampsCollected++;
                    stampCountDisplay.innerText = stampsCollected;
                    
                    const percentage = (stampsCollected / totalStamps) * 100;
                    progressFill.style.width = percentage + '%';

                    // --- NEW CODE: Check if all stamps are collected ---
                    if (stampsCollected === totalStamps) {
                        // Wait 600ms for the final progress bar to fill, then slam the giant stamp
                        setTimeout(() => {
                            document.querySelector('.right-page').classList.add('all-approved');
                        }, 600); 
                    }
                    // ---------------------------------------------------
                    
                }, 100);
            }
        });
    });
});