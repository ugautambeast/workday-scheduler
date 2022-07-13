const time = moment();
$("#currentDay").text(time.format("dddd, MMMM Do, YYYY"));


const timeBlocks = $("#time-blocks");

$.each(hoursList, function (i, hours) {
    const timeBlock = $("<form>");
    timeBlock.addClass("row time-block");

    let hour = $("<label>");
    hour.addClass("col-3 col-sm-2 col-lg-1 hour textarea");
    hour.text(hours);

    let blocksTime = moment(hours, "h A");
    let blocksTimeHourLater = moment(hours, "h A").add(1, "h");

    let blockDesc = JSON.parse(localStorage.getItem("blockDesc")) || [];

    const desc = $("<input>");
    desc.addClass("col-6 col-sm-8 col-lg-10 description textarea");
    desc.attr("id", "desc" + i);
    desc.val(blockDesc[i]);
    console.log(i, blockDesc[i])

    if (time.isSame(blocksTime) || time.isBetween(blocksTime, blocksTimeHourLater)) {
        desc.addClass("present")
    }
    else if (blocksTime.isBefore(time)) {
        desc.addClass("past")
    }
    else if (blocksTime.isAfter(time)) {
        desc.addClass("future")
    }

    const saveBtn = $("<button>");
    saveBtn.addClass("col-3 col-sm-2 col-lg-1 saveBtn");
    saveBtn.attr("data-index", i);
    saveBtn.html('<i class="fas fa-save"></i>');
    timeBlock.append(hour, desc, saveBtn);
    timeBlocks.append(timeBlock);
});

function handleSaveItem(event) {
    event.preventDefault();

    let btnClicked = $(event.target);
    let btnIndex = 0;

    if (btnClicked.attr("data-index") === undefined) {
        console.log(btnClicked.parent().attr("data-index"));
        btnIndex = btnClicked.parent().attr("data-index");
    }
    else {
        console.log(btnClicked.attr("data-index"));
        btnIndex = btnClicked.attr("data-index");
    }

    let blockDesc = JSON.parse(localStorage.getItem("blockDesc")) || [];

    blockDesc[btnIndex] = $("#desc" + btnIndex).val();
    console.log($("#desc" + btnIndex).val());
    localStorage.setItem("blockDesc", JSON.stringify(blockDesc))
}

