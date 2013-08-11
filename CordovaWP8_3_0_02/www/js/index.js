/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        var data = [
            {
                value: 30,
                color: "#999"
            },
            {
                value: 50,
                color: "#d9534f"
            },
            {
                value: 100,
                color: "#5cb85c"
            },
            {
                value: 40,
                color: "#f0ad4e"
            },
            {
                value: 120,
                color: "#5bc0de"
            }
        ];

        var ctx = document.getElementById("myChart");
        if (ctx) {
            ctx = ctx.getContext("2d");
            var mychartctx = new Chart(ctx).Doughnut(data);
        }

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $("#payForward").on("click tap", function(e) {
            app.makeSms($("#phoneNumber").val(), $("#phoneText").val());
        });
        $("#justin-reminder").on("click tap", function(e) {
            $("#reminderPopup").modal();
        });
        $("#emailReminderButton").on("click tap", function (e) {
            app.makeEmailReminder($(this).data("emailAddress"), $(this).data("body"));
            $("#simplemodal-container a.modalCloseImg").click();
            $(".sendReminderButton").text("Reminder sent!");
        });
        $("#smsReminderButton").on("click tap", function (e) {
            app.makeSms($(this).data("phone"), $(this).data("body"));
            $("#simplemodal-container a.modalCloseImg").click();
            $(".sendReminderButton").text("Reminder sent!");
        });
        
        $(".payUpButton").on("click tap", function(e) {
            $("#payUpPopup").modal();
        });

        $(".paypalButton").on("click tap", function(e) {
            $("#paypal-button input[name=amount]").val($(this).data("amount"));

            $("#paypal-button").submit();
        });

        $("#cancelButton").on("click tap", function (e) {
            $("#simplemodal-container a.modalCloseImg").click();
        });

        $(".tabButton").on("click tap", function(e) {
            $(".tabContainer").hide();

            var id = $(this).attr("id");
            id = id.split("-")[1];
            var tabId = "#tabs-" + id;
            $(tabId).show();
        });
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    makeSms: function(inputNumber, body) {
        $.ajax({
            url: 'http://payforward.cloudapp.net/sms/Send',
            type: "POST",
            data: {
                "phoneNumber": "+1" + inputNumber,
                "body": body
            }
        });
    },
    makeEmailReminder: function (emailAddress, body) {
        $.ajax({
            url: 'http://payforward.cloudapp.net/email/Send',
            type: "POST",
            data: {
                "emailAddress": emailAddress,
                "body": body
            }
        });
    }
};
