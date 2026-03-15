import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Sends a message to the AI Data Agent backend.
 * @param {string} message - The user's query.
 * @returns {Promise<Object>} - The AI's response which could be text, chart, or flowchart.
 */
export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.warn('Backend not available, using localized mock responses for demonstration.');
      return getMockResponse(message);
    }
    console.error('Error communicating with the backend:', error);
    throw error;
  }
};

/**
 * Provides mock responses for frontend testing when no backend is available.
 * @param {string} msg 
 */
function getMockResponse(msg) {
  const lowerMsg = msg.toLowerCase();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (lowerMsg.includes('chart') && lowerMsg.includes('pie')) {
        resolve({
          type: 'chart',
          chartType: 'pie',
          data: [
             { name: 'Group A', value: 400 },
             { name: 'Group B', value: 300 },
             { name: 'Group C', value: 300 },
             { name: 'Group D', value: 200 }
          ]
        });
      } else if (lowerMsg.includes('chart') && lowerMsg.includes('line')) {
        resolve({
          type: 'chart',
          chartType: 'line',
          data: [
             { name: 'Jan', value: 4000 },
             { name: 'Feb', value: 3000 },
             { name: 'Mar', value: 2000 },
             { name: 'Apr', value: 2780 },
             { name: 'May', value: 1890 },
             { name: 'Jun', value: 2390 },
             { name: 'Jul', value: 3490 }
          ]
        });
      } else if (lowerMsg.includes('chart') || lowerMsg.includes('revenue')) {
        resolve({
          type: 'chart',
          chartType: 'bar',
          data: [
             { name: 'Product A', value: 5000 },
             { name: 'Product B', value: 4000 },
             { name: 'Product C', value: 3000 },
             { name: 'Product D', value: 2000 },
             { name: 'Product E', value: 1000 }
          ]
        });
      } else if (lowerMsg.includes('flowchart') || lowerMsg.includes('diagram') || lowerMsg.includes('payment')) {
        resolve({
          type: 'flowchart',
          data: `graph TD
  Customer -->|Places Order| Order
  Order -->|Processes| Payment
  Payment -->|Verifies| Gateway((Payment Gateway))
  Gateway -->|Success| Shipping
  Gateway -->|Fails| Retry[Retry Payment]
  Shipping --> Delivered`
        });
      } else {
        resolve({
          type: 'text',
          data: "Here is your data analysis result. \n\n### Key Highlights\n- **Revenue** is up 15% this quarter.\n- **Customer engagement** remains strong.\n\nLet me know if you want to see a **chart** or a **flowchart** representing our recent metrics!"
        });
      }
    }, 1500); // simulate network latency
  });
}
