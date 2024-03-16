

let globalPlanCostbyod = 0;
let globalAddonCostbyod = 0;
let globalfirstbill = 0;

//-------------------these are te global variable for new phone field-----------------

let globalPlanCostNewPhone = 0;
let globalAddonCostNewPhone = 0;
let globalOneTimeChargeNewPhone = 0;
let globalOneTimeChargeWaivedNewPhone = false;
let globalDownPaymentNewPhone = 0;
let globalPhoneRetailCostNewPhone = 0;
let globalFinancingDiscountNewPhone = 0;
let globalleasebuyout = 0;
let globalLeaseOrFinanceChoice = ''; // This variable will store the user's choice between 'Finance' or 'Lease'

//------------------------------------------------------------------------------------

// Function to toggle fields based on the selected option
function toggleFields(selectedType) {
var byodFields = document.getElementById('byodFields');
var newPhoneFields = document.getElementById('newPhoneFields');

// Hide both sections and only show the selected one
byodFields.style.display = 'none';
newPhoneFields.style.display = 'none';

if (selectedType === 'BYOD') {
    byodFields.style.display = 'block';
} else if (selectedType === 'New Phone') {
    newPhoneFields.style.display = 'block';
}
}

// Check if the BYOD fields are filled
function areByodFieldsFilled() {
return document.getElementById('monthlyPlanCostNoTerm').value &&
       document.getElementById('monthlyAddonCostBYOD').value &&
       document.getElementById('oneTimeCharges').value;
}

function arenewPhoneFields() {
  return document.getElementById('monthlyPlanCostContract').value &&
         document.getElementById('phoneRetailCost').value &&
         document.getElementById('monthlyAddonCost').value &&
         document.getElementById('downPayment').value &&
         document.getElementById('financingDiscount').value &&
         document.getElementById('oneTimeChargescontract').value; // Assuming this ID for one-time charges
}

// Function to toggle the display of the down payment percentage input field
function toggleDownPaymentPercentageField() {
    var selection = document.getElementById('mandatoryDownPayment').value;
    var percentageField = document.getElementById('downPaymentPercentageField');
    if (selection === 'Yes') {
        percentageField.style.display = 'block';
    } else {
        percentageField.style.display = 'none';
        document.getElementById('downPaymentPercentage').value = ''; // Clear the percentage field if 'No' is selected
    }
}

// Updated formatPercentage function with down payment calculation
function formatPercentage() {
    var inputField = document.getElementById('downPaymentPercentage');
    var value = inputField.value.replace('%', ''); // Remove percentage symbol for calculation
    var percentage = parseFloat(value) / 100; // Convert to decimal for calculation

    // Only proceed if the percentage is a valid number
    if (!isNaN(percentage)) {
        // Calculate the base for the down payment based on the leasing or financing choice
        var phoneRetailCost = parseFloat(document.getElementById('phoneRetailCost').value) || 0;
        var financingDiscount = parseFloat(document.getElementById('financingDiscount').value) || 0;
        var leaseBuyOutAmount = parseFloat(document.getElementById('leaseBuyOutAmount').value) || 0;
        var leaseOrFinanceChoice = document.getElementById('leaseorfinanceid').value;

        var baseAmount = phoneRetailCost - financingDiscount; // Default base amount calculation
        if (leaseOrFinanceChoice === 'Lease') {
            baseAmount -= leaseBuyOutAmount; // Adjust base amount for leasing option
        }

        // Calculate the total down payment
        var totalDownPayment = baseAmount * percentage;
        // Update the Total Down Payment field
        document.getElementById('downPayment').value = totalDownPayment.toFixed(2);
    }

    // Re-append the percentage symbol to the input value (for display purposes)
    inputField.value = `${value}%`;
}

// Modified displayNextForm function to include country and province dropdowns
function displayNextForm() {

  globalPlanCostbyod = parseFloat(document.getElementById('monthlyPlanCostNoTerm').value) || 0;
  globalAddonCostbyod = parseFloat(document.getElementById('monthlyAddonCostBYOD').value) || 0;
  globalfirstbill = parseFloat(document.getElementById('oneTimeCharges').value) || 0;


   document.querySelector('.phone-screen').innerHTML =
   '<form id="countryForm">' +
   '<div class="form-group">' +
   '<label>Select country:</label>' +
   '<select id="country" name="country">' +
   '<option value="CANADA">CANADA</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group">' +
   '<label>Select province:</label>' +
   '<select id="province" name="province">' +
   '<option value="ALBERTA">Alberta</option>' +
   '<option value="BRITISH_COLUMBIA">British Columbia</option>' +
   '<option value="MANITOBA">Manitoba</option>' +
   '<option value="NEW_BRUNSWICK">New Brunswick</option>' +
   '<option value="NEWFOUNDLAND_AND_LABRADOR">Newfoundland and Labrador</option>' +
   '<option value="NORTHWEST_TERRITORIES">Northwest Territories</option>' +
   '<option value="NOVA_SCOTIA">Nova Scotia</option>' +
   '<option value="NUNAVUT">Nunavut</option>' +
   '<option value="ONTARIO">Ontario</option>' +
   '<option value="PRINCE_EDWARD_ISLAND">Prince Edward Island</option>' +
   '<option value="QUEBEC">Quebec</option>' +
   '<option value="SASKATCHEWAN">Saskatchewan</option>' +
   '<option value="YUKON">Yukon</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group submit-group">' +
   '<button type="button" id="finalSubmit" class="btn">Calculate Bill</button>' +
   '</div>' +
   '</form>';

   // Add event listener for the final submit button within the new form
   document.getElementById('finalSubmit').addEventListener('click', calculateFinalBill);
}
//-----------------NOW DUPLICATING FOR NEW PHONE SECTION---------------------------------------------

function displaynewPhonenext() {

  globalPlanCostNewPhone = parseFloat(document.getElementById('monthlyPlanCostContract').value) || 0;
  globalAddonCostNewPhone = parseFloat(document.getElementById('monthlyAddonCost').value) || 0;
  globalPhoneRetailCostNewPhone = parseFloat(document.getElementById('phoneRetailCost').value) || 0;
  globalDownPaymentNewPhone = parseFloat(document.getElementById('downPayment').value) || 0;
  globalFinancingDiscountNewPhone = parseFloat(document.getElementById('financingDiscount').value) || 0;
  globalOneTimeChargeNewPhone = parseFloat(document.getElementById('oneTimeChargescontract').value) || 0;
  globalleasebuyout = parseFloat(document.getElementById('leaseBuyOutAmount').value) || 0;

   document.querySelector('.phone-screen').innerHTML =
   '<form id="countryForm">' +
   '<div class="form-group">' +
   '<label>Select country:</label>' +
   '<select id="country" name="country">' +
   '<option value="CANADA">CANADA</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group">' +
   '<label>Select province:</label>' +
   '<select id="province" name="province">' +
   '<option value="ALBERTA">Alberta</option>' +
   '<option value="BRITISH_COLUMBIA">British Columbia</option>' +
   '<option value="MANITOBA">Manitoba</option>' +
   '<option value="NEW_BRUNSWICK">New Brunswick</option>' +
   '<option value="NEWFOUNDLAND_AND_LABRADOR">Newfoundland and Labrador</option>' +
   '<option value="NORTHWEST_TERRITORIES">Northwest Territories</option>' +
   '<option value="NOVA_SCOTIA">Nova Scotia</option>' +
   '<option value="NUNAVUT">Nunavut</option>' +
   '<option value="ONTARIO">Ontario</option>' +
   '<option value="PRINCE_EDWARD_ISLAND">Prince Edward Island</option>' +
   '<option value="QUEBEC">Quebec</option>' +
   '<option value="SASKATCHEWAN">Saskatchewan</option>' +
   '<option value="YUKON">Yukon</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group submit-group">' +
   '<button type="button" id="finalSubmitcontract" class="btn">Calculate Bill</button>' +
   '</div>' +
   '</form>';

   // Add event listener for the final submit button within the new form
   document.getElementById('finalSubmitcontract').addEventListener('click', calculateFinalBillContract);

}

//---------------------------------------------------------------------------------------------------

function calculateFinalBill() {
   var province = document.getElementById('province').value;
   var taxRate;
   switch (province) {
       case "ALBERTA":
       case "BRITISH_COLUMBIA":
       case "MANITOBA":
       case "NORTHWEST_TERRITORIES":
       case "NUNAVUT":
       case "QUEBEC":
       case "SASKATCHEWAN":
       case "YUKON":
           taxRate = 0.05;
           break;
       case "ONTARIO":
           taxRate = 0.13;
           break;
       case "NEW_BRUNSWICK":
       case "NEWFOUNDLAND_AND_LABRADOR":
       case "NOVA_SCOTIA":
       case "PRINCE_EDWARD_ISLAND":
           taxRate = 0.15;
           break;
       default:
           taxRate = 0; // Default case if the province is not on the list.
   }
//-----------------------------------------------

   var planCost = globalPlanCostbyod;
   var addOnCost = globalAddonCostbyod;
   var oneTimeCharges = globalfirstbill;
   var taxes = (planCost + addOnCost + oneTimeCharges) * taxRate;
   var monthlyBillBeforeTax = planCost + addOnCost;
   var totalBillFirstMonth = monthlyBillBeforeTax + oneTimeCharges + taxes;
   var totalBillOtherMonths = monthlyBillBeforeTax + (monthlyBillBeforeTax * taxRate);

   // Clear the form and prepare to display the table
   var form = document.querySelector('.phone-screen form');
   form.innerHTML = '';

   // Create and append the bill summary header
   var billHeaderDiv = document.createElement('div');
   billHeaderDiv.style.textAlign = 'center';
   billHeaderDiv.style.margin = '20px 0';
   billHeaderDiv.style.fontSize = '1.2em';
   billHeaderDiv.style.wordWrap = 'break-word';
   billHeaderDiv.innerHTML = "<strong>Bill Summary Including Tax</strong><br><br>" +
                             "Total monthly bill after tax: $" + totalBillOtherMonths.toFixed(2) + "<br>";
   form.appendChild(billHeaderDiv);


   // Create the table
   var billTable = document.createElement('table');
   billTable.style.width = '100%';
   billTable.style.textAlign = 'left';
   billTable.border = '1';

   // Add table header
   var header = billTable.createTHead();
   var headerRow = header.insertRow(0);
   var headers = ["Month", "Plan", "Add-on", "Other Charges", "Taxes", "Total"];
   headers.forEach(function(text) {
       var cell = headerRow.insertCell();
       cell.innerHTML = "<strong>" + text + "</strong>";
   });

   // Function to create a cell in a row
   function createCell(row, text, isBold) {
       var cell = row.insertCell();
       cell.innerHTML = isBold ? "<strong>" + text + "</strong>" : text;
   }

   // Add rows for each month
   var months = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
   for (var i = 0; i < months.length; i++) {
       var row = billTable.insertRow();
       var monthName = months[i] + " Month";
       var otherChargesThisMonth = (i === 0) ? oneTimeCharges.toFixed(2) : "0.00";
       var taxesThisMonth = (i === 0) ? taxes.toFixed(2) : (monthlyBillBeforeTax * taxRate).toFixed(2);
       var totalThisMonth = (i === 0) ? totalBillFirstMonth.toFixed(2) : totalBillOtherMonths.toFixed(2);

       createCell(row, monthName, false);
       createCell(row, planCost.toFixed(2), false);
       createCell(row, addOnCost.toFixed(2), false);
       createCell(row, otherChargesThisMonth, false);
       createCell(row, taxesThisMonth, false);
       createCell(row, totalThisMonth, true); // Bold the total amount
   }

   // Append the table to the form
   form.appendChild(billTable);

   // Create space after the table
   var spaceAfterTable = document.createElement('div');
   spaceAfterTable.style.marginBottom = '20px'; // adjust the space as needed
   form.appendChild(spaceAfterTable);

   // Add back to home button
   var homeButton = document.createElement('button');
   homeButton.innerText = 'Back to Home';
   homeButton.className = 'btn';
   homeButton.onclick = function() {
       location.reload();
   };
   form.appendChild(homeButton);
}


// Modify the event listener for byodSubmit to use displayNextForm directly without calculating the bill immediately
document.getElementById('byodSubmit').addEventListener('click', function() {
   if (areByodFieldsFilled()) {
       displayNextForm();
   } else {
       alert('Please fill in all fields for the BYOD plan.');
   }
});
// Modify the event listener for newphonesubmit to use displayNextForm directly without calculating the bill immediately
document.getElementById('phoneSubmit').addEventListener('click', function() {
   if (arenewPhoneFields()) {
       displaynewPhonenext();
   } else {
       alert('Please fill in all fields to calculate cost with New Phone.');
   }
});

// Make sure to add event listener for 'finalSubmit' button after new form is added to DOM
document.addEventListener('click', function(event) {
   if (event.target && event.target.id === 'finalSubmit') {
       calculateFinalBill();
   }
});

//------------------------------DUPLICATING FOR NEW PHONE---------------------------------------------------------------

function calculateFinalBillContract() {

     var province = document.getElementById('province').value;
     var taxRate;
     switch (province) {
         case "ALBERTA":
         case "BRITISH_COLUMBIA":
         case "MANITOBA":
         case "NORTHWEST_TERRITORIES":
         case "NUNAVUT":
         case "QUEBEC":
         case "SASKATCHEWAN":
         case "YUKON":
             taxRate = 0.05;
             break;
         case "ONTARIO":
             taxRate = 0.13;
             break;
         case "NEW_BRUNSWICK":
         case "NEWFOUNDLAND_AND_LABRADOR":
         case "NOVA_SCOTIA":
         case "PRINCE_EDWARD_ISLAND":
             taxRate = 0.15;
             break;
         default:
             taxRate = 0; // Default case if the province is not on the list.
     }



      var phoneTotalCost = globalPhoneRetailCostNewPhone - globalDownPaymentNewPhone - globalFinancingDiscountNewPhone;
      var phonemonthlycost = (phoneTotalCost + (phoneTotalCost * taxRate)) / 24;
      var planmonthlycost = (globalPlanCostNewPhone + globalAddonCostNewPhone) * (1 + taxRate);
      var monthlycostcontractperiod = phonemonthlycost + planmonthlycost;

//-------------------------------------------------------------------------------
      var leaseOrFinanceChoice = globalLeaseOrFinanceChoice;
      var monthlyTotalBill = planmonthlycost; // Default to planmonthlycost
      var monthlycostcontractperiodatlease = 0;

      if (globalLeaseOrFinanceChoice === 'Lease') {
          var showleaseBuyOutAmount = globalleasebuyout;
          var monthlycostcontractperiodatlease = ((phoneTotalCost * (1 + taxRate)) - showleaseBuyOutAmount) / 24;
          monthlyTotalBill += monthlycostcontractperiodatlease;
      } else {
          monthlyTotalBill += phonemonthlycost;
      }


//---------------------------------------------------------------


      var form = document.querySelector('.phone-screen form');
      form.innerHTML = ''; // Set the "Bill Summary" header

      // Create a new div to hold the total bill text
      var billDivcontract = document.createElement('div');
      billDivcontract.style.textAlign = 'center';
      billDivcontract.style.margin = '20px 0'; // Add some spacing around the text
      billDivcontract.style.fontSize = '1.2em'; // Make the text a little larger
      billDivcontract.style.wordWrap = 'break-word'; // Ensure the text wraps to avoid overflow

      // Set the "Bill Summary" header
      var billsummaryheader = "<strong>Bill Summary (Including Tax)</strong>";

      // Calculate financing and leasing details
       var financingMonthlyTotalBill = planmonthlycost + phonemonthlycost;
       var leasingMonthlyTotalBill = planmonthlycost + ((phoneTotalCost * (1 + taxRate)) - globalleasebuyout) / 24;

       var downwithtax = globalDownPaymentNewPhone * (1+taxRate);

       // Logic to display bill summary including both financing and leasing
     var financeContent = "<h4>Option: Finance</h4>" +
                          "Total monthly on Finance: $" + financingMonthlyTotalBill.toFixed(2) + "<br><br>" +
                          "<div style='border: 1px solid black; padding: 5px; display: flex; align-items: center;'>" + // Border for the entire box and flex display
                          "<div style='flex: 1; text-align: right; padding-left: 10px; padding-right:10px; white-space: nowrap;'>" + // Left column for text with a right border
                          "Plan cost:<br>" +
                          "Financing cost:" +
                          "</div>" +
                          "<div style='flex: 1; text-align: left; padding-left: 10px; white-space: nowrap;'>" + // Right column for values with padding and no wrapping
                          "$" + planmonthlycost.toFixed(2) + "<br>" +
                          "$" + phonemonthlycost.toFixed(2) +
                          "</div>" +
                          "</div><br>"+
                          "Total downPayment: $" + downwithtax.toFixed(2) +
                          "<br><br>" +
                          "Return home to view other options";




       var leaseContent = "<h4>Option: Lease</h4>" +
                   "Total monthly on Lease: $" + leasingMonthlyTotalBill.toFixed(2) + "<br><br>" +
                   "<div style='border: 1px solid black; padding: 5px; display: flex; align-items: center;'>" + // Border for the entire box and flex display
                   "<div style='flex: 1; text-align: right; padding-left: 10px; padding-right:10px; white-space: nowrap;'>" + // Left column for text with a right border
                   "Plan cost:<br>" +
                   "Lease cost:" +
                   "</div>" +
                   "<div style='flex: 1; text-align: left; padding-left: 10px; white-space: nowrap;'>" + // Right column for values with padding and no wrapping
                   "$" + planmonthlycost.toFixed(2) + "<br>" +
                   "$" + monthlycostcontractperiodatlease.toFixed(2) +
                   "</div>" +
                   "</div><br>" +
                   "Total Down Payment: $" + downwithtax.toFixed(2)+
                   "<br><br>" +
                   "Return home to view other options";


       if (globalLeaseOrFinanceChoice === '') {
         // User has not made a choice, show both options
         billDivcontract.innerHTML = billsummaryheader + financeContent + "<br>" ;
       } else if (globalLeaseOrFinanceChoice === 'Lease') {
         // User has chosen leasing, show lease option first
         billDivcontract.innerHTML = billsummaryheader + leaseContent + "<br>";
       }


       // Append the new div to the form container
       form.appendChild(billDivcontract);

       // Add an ad container after the bill summary but before the "Back to Home" button
       var adContainer = document.createElement('div');
       adContainer.className = 'ad-container'; // Class for styling the ad container
       adContainer.style.display = 'none'; // Hide by default
       adContainer.style.margin = '20px 0'; // Ensure some space around the ad container for aesthetics
       form.appendChild(adContainer);

       // Create and append the ad script to the adContainer
       var adScript = document.createElement('script');
       adScript.async = true;
       adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
       adScript.crossOrigin = "anonymous";
       adContainer.appendChild(adScript);

       // Create and append the ad slot to the adContainer
       var adSlot = document.createElement('ins');
       adSlot.className = "adsbygoogle";
       adSlot.style.display = "block"; // AdSense will change this when ad is loaded
       adSlot.setAttribute("data-ad-client", "ca-pub-8859880139377275");
       adSlot.setAttribute("data-ad-slot", "6589621121");
       adSlot.setAttribute("data-ad-format", "auto");
       adSlot.setAttribute("data-full-width-responsive", "true");
       adContainer.appendChild(adSlot);

       // After appending the adSlot, append the script to initiate ads
       var initAdScript = document.createElement('script');
       initAdScript.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
       adContainer.appendChild(initAdScript);

       // Use MutationObserver to check when ad is loaded and change display of container
       var observer = new MutationObserver(function(mutations) {
           mutations.forEach(function(mutation) {
               if (mutation.attributeName === "data-adsbygoogle-status") {
                   adContainer.style.display = 'block';
               }
           });
       });

       observer.observe(adSlot, {
           attributes: true
       });

       //-------------------------------------------- for ad


     var homeButton = document.createElement('button');
         homeButton.innerText = 'Back to Home';
         homeButton.className = 'btn'; // Assuming 'btn' class is for styling
         homeButton.onclick = function() {
             location.reload(); // This will reload the page
         };

         // Append the "Home" button below the total bill text
         form.appendChild(homeButton);

}



//---------------------------------------------------------------------------------------------
function toggleLeaseBuyOutField() {
    var selection = document.getElementById('leaseorfinanceid').value;
    var leaseBuyOutField = document.getElementById('leaseBuyOutField');
    if (selection === 'Lease') {
        leaseBuyOutField.style.display = 'block';
        // Update globalLeaseOrFinanceChoice to 'Lease'
        globalLeaseOrFinanceChoice = 'Lease';
    } else {
        leaseBuyOutField.style.display = 'none';
        // Update globalLeaseOrFinanceChoice to 'Finance'
        globalLeaseOrFinanceChoice = 'Finance';
    }
}
document.getElementById('leaseorfinanceid').addEventListener('change', toggleLeaseBuyOutField);
document.getElementById('leaseorfinanceid').addEventListener('change', function() {
    // Trigger the calculation when the leasing or financing choice changes
    formatPercentage(); // This assumes the user has already entered a down payment percentage
});

document.getElementById('newPhone').addEventListener('click', function() {
    toggleFields('New Phone');
});
